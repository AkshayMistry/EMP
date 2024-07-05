import { Request, Response } from "express";
import Event from "../models/event";

const PAGE_SIZE = 10;

export const listEvents = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const totalEvents = await Event.countDocuments();
    const totalPages = Math.ceil(totalEvents / PAGE_SIZE);
    const events = await Event.find()
      .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE);

    // Format dates before sending to template
    const formattedEvents = events.map((event) => ({
      ...event.toObject(),
      eventDate: formatDate(event.eventDate),
      createdAt: formatDate(event.createdAt),
      updatedAt: formatDate(event.updatedAt),
      // Add more fields as needed
    }));

    res.render("index", { events : formattedEvents, page, totalPages });
  } catch (err) {
    res.status(500).send("Error fetching events");
  }
};

export const viewEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send("Event not found");
    res.render("view", { event });
  } catch (err) {
    res.status(500).send("Error fetching event");
  }
};

export const addEvent = (req: Request, res: Response) => {
  res.render("add");
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.redirect("/");
  } catch (err) {
    console.log("err-->", err);
    res.status(500).send("Error creating event");
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).send("Event not found");
    res.render("edit", { event });
  } catch (err) {
    res.status(500).send("Error fetching event");
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error updating event");
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Error deleting event");
  }
};

// Helper function to format dates
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}