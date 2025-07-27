import { Event } from "@/interfaces/event";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const eventsDirectory = join(process.cwd(), "_events");

export function getEventSlugs() {
  return fs.readdirSync(eventsDirectory);
}

export function getEventBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(eventsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Event;
}

export function getAllEvents(): Event[] {
  const slugs = getEventSlugs();
  const events = slugs
    .map((slug) => getEventBySlug(slug))
    // sort events by date in descending order
    .sort((event1, event2) => (event1.date > event2.date ? -1 : 1));
  return events;
}

export function getUpcomingEvents(): Event[] {
  return getAllEvents().filter(event => event.isUpcoming);
}

export function getPastEvents(): Event[] {
  return getAllEvents().filter(event => !event.isUpcoming);
}

export function getEventsByLanguage(language: string): Event[] {
  return getAllEvents().filter(event => event.language === language);
}

export function getUpcomingEventsByLanguage(language: string): Event[] {
  return getUpcomingEvents().filter(event => event.language === language);
}

export function getPastEventsByLanguage(language: string): Event[] {
  return getPastEvents().filter(event => event.language === language);
}

export function getEventBySlugAndLanguage(slug: string, language: string) {
  const event = getEventBySlug(slug);
  return event.language === language ? event : null;
} 