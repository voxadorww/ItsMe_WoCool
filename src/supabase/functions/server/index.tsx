import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-1c582d9e/health", (c) => {
  return c.json({ status: "ok" });
});

// Get all projects
app.get("/make-server-1c582d9e/projects", async (c) => {
  try {
    const projects = await kv.getByPrefix("project:");
    return c.json({ success: true, projects });
  } catch (error) {
    console.log("Error fetching projects:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Create a new project
app.post("/make-server-1c582d9e/projects", async (c) => {
  try {
    const body = await c.req.json();
    const { id, title, description, image, tags, link } = body;
    
    if (!id || !title || !description) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const project = { id, title, description, image, tags, link };
    await kv.set(`project:${id}`, project);
    
    return c.json({ success: true, project });
  } catch (error) {
    console.log("Error creating project:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update a project
app.put("/make-server-1c582d9e/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { title, description, image, tags, link } = body;
    
    if (!title || !description) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    const project = { id, title, description, image, tags, link };
    await kv.set(`project:${id}`, project);
    
    return c.json({ success: true, project });
  } catch (error) {
    console.log("Error updating project:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Delete a project
app.delete("/make-server-1c582d9e/projects/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`project:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log("Error deleting project:", error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);