export const defaultBlueprintData = [
  {
    id: Date.now() + 1, // Unique ID using timestamp
    stage: "Awareness 2",
    customerEmotions: "Happy",
    customerActions: "Customer sees an ad for the service on social media.",
    frontstageInteractions: "Social media ad display and website link.",
    backstageInteractions: "Marketing team runs targeted ad campaigns.",
    supportProcesses: "CRM system for targeted marketing; ad management tools.",
    physicalEvidence: "Social media posts, website content, display ads.",
  },
  {
    id: Date.now() + 2, // Unique ID using timestamp
    stage: "Consideration 2",
    customerEmotions: "Disappointed",
    customerActions:
      "Customer visits website, browses services, and reads reviews.",
    frontstageInteractions:
      "Website homepage, search filters, and product listings.",
    backstageInteractions:
      "Backend processes manage content and ensure up-to-date data.",
    supportProcesses: "Content management system (CMS) and review aggregator.",
    physicalEvidence: "Website visuals, customer testimonials, review pages.",
  },
  {
    id: Date.now() + 3, // Unique ID using timestamp
    stage: "Purchase 2",
    customerEmotions: "",
    customerActions: "Customer adds item to cart and completes checkout.",
    frontstageInteractions:
      "Shopping cart, checkout flow, and payment confirmation.",
    backstageInteractions: "Order processing and inventory check.",
    supportProcesses: "Payment gateway, order management system.",
    physicalEvidence: "Confirmation email, digital receipt.",
  },
  {
    id: Date.now() + 4, // Unique ID using timestamp
    stage: "Delivery 2",
    customerEmotions: "Frustrated",
    customerActions:
      "Customer receives updates on delivery and receives product.",
    frontstageInteractions:
      "Delivery tracking, SMS or app notifications. Delivery tracking, SMS or app notifications.",
    backstageInteractions:
      "Dispatch assigns delivery personnel; updates tracking.",
    supportProcesses: "Logistics management system, GPS tracking.",
    physicalEvidence: "Package, delivery status notifications, tracking page.",
  },
  {
    id: Date.now() + 5, // Unique ID using timestamp
    stage: "Post-Service 2",
    customerEmotions: "Happy",
    customerActions:
      "Customer provides feedback or contacts support for any issues.",
    frontstageInteractions: "Customer support chat or feedback form in app.",
    backstageInteractions:
      "Support team processes feedback or resolves issues.",
    supportProcesses: "Customer support platform, feedback analysis tool.",
    physicalEvidence: "Thank-you email, feedback confirmation message.",
  },
];
