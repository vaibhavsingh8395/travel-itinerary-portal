/**
 * Normalizes and validates incoming travel itinerary request payloads.
 */
export function processItineraryPayload(rawRequest) {
  const { destination, days, notes, contactEmail } = rawRequest;

  if (!destination || !days || !contactEmail) {
    throw new Error("Missing required fields: destination, days, or contact email.");
  }

  // Parse duration into integer days
  const durationDays = parseInt(days.split(" ")[0], 10) || 1;

  // Categorize preferences based on keywords
  const categories = [];
  const lowerNotes = (notes || "").toLowerCase();

  if (lowerNotes.includes("food") || lowerNotes.includes("restaurant") || lowerNotes.includes("culinary")) {
    categories.push("Culinary & Dining");
  }
  if (lowerNotes.includes("luxury") || lowerNotes.includes("5 star") || lowerNotes.includes("resort")) {
    categories.push("Luxury & Wellness");
  }
  if (lowerNotes.includes("budget") || lowerNotes.includes("cheap") || lowerNotes.includes("hostel")) {
    categories.push("Budget Travel");
  }
  if (lowerNotes.includes("outdoor") || lowerNotes.includes("hiking") || lowerNotes.includes("nature")) {
    categories.push("Adventure & Nature");
  }
  if (categories.length === 0) {
    categories.push("General Sightseeing");
  }

  return {
    destination: destination.trim(),
    duration_days: durationDays,
    preferences: notes ? notes.trim() : "None provided",
    delivery_email: contactEmail.trim().toLowerCase(),
    tags: categories,
    created_at: new Date().toISOString()
  };
}
