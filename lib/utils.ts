import { clsx, type ClassValue } from "clsx";
import type { Agent } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatKES(value?: number | null, purpose?: string | null) {
  if (purpose === "Manage") return "Managed asset";
  if (!value) return "Price on request";
  return purpose === "Rent"
    ? new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }).format(value) + "/mo"
    : new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function toTitleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function parseArray(value: FormDataEntryValue | null) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function mapEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function getWhatsappLink(message: string) {
  return `https://wa.me/254742370125?text=${encodeURIComponent(message)}`;
}

const leadershipKeywords = [
  "ceo",
  "chief executive",
  "director",
  "managing director",
  "executive director",
  "founder",
  "co-founder",
  "chair",
  "chairperson",
  "head of",
  "principal",
];

export function isLeadershipRole(role?: string | null) {
  const normalized = (role || "").toLowerCase();
  return leadershipKeywords.some((keyword) => normalized.includes(keyword));
}

export function splitPeople(agents: Agent[]) {
  const leadership = agents.filter((agent) => isLeadershipRole(agent.role));
  const agentsOnly = agents.filter((agent) => !isLeadershipRole(agent.role));
  return { leadership, agents: agentsOnly };
}
