import { Router } from "express";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { sendInquiryNotification } from "../services/emailService.js";

const router = Router();

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(160).optional().default(""),
  projectType: z.string().trim().min(2).max(100),
  budget: z.string().trim().max(100).optional().default(""),
  timeline: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().min(10).max(5000),
});

function getSupabase() {
  if (
    !process.env.SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    throw new Error(
      "Supabase environment variables are not configured."
    );
  }

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}


// 🔐 Admin authentication middleware
async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const { data, error } = await getSupabase().auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    req.user = data.user;

    next();
  } catch (error) {
    console.error("Admin authentication error:", error);

    return res.status(401).json({
      message: "Unauthorized.",
    });
  }
}


// 📩 Public inquiry submission
router.post("/", async (req, res) => {
  try {
    const parsed = inquirySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Please check the form fields and try again.",
      });
    }

    const inquiry = parsed.data;

    const { data, error } = await getSupabase()
      .from("inquiries")
      .insert({
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company || null,
        project_type: inquiry.projectType,
        budget: inquiry.budget || null,
        timeline: inquiry.timeline || null,
        message: inquiry.message,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);

      return res.status(500).json({
        message:
          "Your message could not be saved. Please try again.",
      });
    }

    try {
      await sendInquiryNotification(inquiry);
    } catch (emailError) {
      console.error(
        "Email notification error:",
        emailError
      );
    }

    return res.status(201).json({
      message: "Inquiry received.",
      inquiryId: data.id,
    });
  } catch (error) {
    console.error("Inquiry route error:", error);

    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
});


// 🔒 Get inquiries — admin only
router.get("/", requireAdmin, async (_req, res) => {
  try {
    const { data, error } = await getSupabase()
      .from("inquiries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Supabase fetch error:", error);

      return res.status(500).json({
        message: "Could not load inquiries.",
      });
    }

    return res.json({
      inquiries: data,
    });
  } catch (error) {
    console.error("Inquiry fetch error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});


// 🔒 Update inquiry status — admin only
router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "contacted", "completed"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status.",
      });
    }

    const { data, error } = await getSupabase()
      .from("inquiries")
      .update({
        status,
      })
      .eq("id", req.params.id)
      .select("id, status")
      .single();

    if (error) {
      console.error(
        "Supabase status update error:",
        error
      );

      return res.status(500).json({
        message: "Could not update status.",
      });
    }

    return res.json({
      message: "Status updated.",
      inquiry: data,
    });
  } catch (error) {
    console.error("Status update error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});


// 🔒 Delete inquiry — admin only
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    // Make sure an ID was actually provided
    if (!id) {
      return res.status(400).json({
        message: "Inquiry ID is required.",
      });
    }

    const supabase = getSupabase();

    // First find the exact inquiry
    const { data: inquiry, error: findError } = await supabase
      .from("inquiries")
      .select("id")
      .eq("id", id)
      .single();

    if (findError || !inquiry) {
      console.error("Inquiry not found:", findError);

      return res.status(404).json({
        message: "Inquiry not found.",
      });
    }

    // Delete ONLY the exact inquiry with this ID
    const { data: deletedInquiry, error: deleteError } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id)
      .select("id")
      .single();

    if (deleteError || !deletedInquiry) {
      console.error("Supabase delete error:", deleteError);

      return res.status(500).json({
        message: "Could not delete inquiry.",
      });
    }

    return res.json({
      message: "Inquiry deleted.",
      inquiryId: deletedInquiry.id,
    });
  } catch (error) {
    console.error("Inquiry delete error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});


export { router as inquiryRouter };