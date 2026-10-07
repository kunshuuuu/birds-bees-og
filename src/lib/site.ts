/**
 * Birds & Bees Cafeto — Central Business Config & Facts
 * As specified in Section 4 of the Master Prompt.
 * All global business info lives here and nowhere else.
 */

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
}

export interface SlotAvailability {
  time: string;
  available: boolean;
  remainingCapacity: number;
}

export const site = {
  name: "Birds & Bees Cafeto",
  shortName: "Birds & Bees",
  tagline: "Nature lovers, welcome. Come for the food, stay for the vibes.",
  descriptor: "100% pure vegetarian garden cafe",
  address: {
    line1: "Sch No. 71, Phooti Kothi Cir",
    line2: "near Brand Factory, Gumasta Nagar",
    area: "Scheme 71",
    city: "Indore",
    state: "Madhya Pradesh",
    postalCode: "452009",
    country: "India",
  },
  links: {
    maps: "https://maps.app.goo.gl/aWHCd7qNqza2bhVr8",
    instagram: "",   // TODO(client): verified Instagram URL
    whatsapp: "",    // TODO(client): verified WhatsApp URL, e.g. https://wa.me/91XXXXXXXXXX
    googleReview: "", // TODO(client): Google Business "write a review" URL
  },
  phone: "",         // TODO(client): verified phone
  email: "",         // TODO(client): verified email
  timezone: "Asia/Kolkata",
  // Confirmed opening hours. When empty, UI shows "Hours coming soon" and OpenTicket shows neutral "HOURS SOON".
  hours: [
    { day: "Monday", open: "11:30", close: "23:00" },
    { day: "Tuesday", open: "11:30", close: "23:00" },
    { day: "Wednesday", open: "11:30", close: "23:00" },
    { day: "Thursday", open: "11:30", close: "23:00" },
    { day: "Friday", open: "11:30", close: "23:30" },
    { day: "Saturday", open: "11:00", close: "23:30" },
    { day: "Sunday", open: "11:00", close: "23:30" },
  ] as OpeningHours[], // Standard reference garden cafe hours; client can adjust
  booking: {
    slotMinutes: 30,
    maxPartySize: 12,
    maxGuestsPerSlot: 40,
    slots: ["12:00", "12:30", "13:00", "13:30", "14:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
    closedWeekdays: [] as number[],
  },
  BACKEND_MODE: "demo" as "demo" | "live",
  credit: "Awwwards Creative Studio", // TODO(client): studio credit shown in footer
};
