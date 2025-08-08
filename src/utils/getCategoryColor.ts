const getCategoryColor = (category: string) => {
  switch (category) {
    case "industry_insights":
      return "bg-blue-100 text-blue-800";
    case "career_&_skills":
      return "bg-emerald-100 text-emerald-800";
    case "business_&_hiring":
      return "bg-purple-100 text-purple-800";
    case "mindset_&_growth":
      return "bg-cyan-100 text-cyan-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default getCategoryColor;
