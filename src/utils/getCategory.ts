
const categoryOptions = [
  {
    label: "Industry Insights",
    value: "industry_insights",
  },
  {
    label: "Career & Skills",
    value: "career_&_skills",
  },
  {
    label: "Business & Hiring",
    value: "business_&_hiring",
  },
  {
    label: "Mindset & Growth",
    value: "mindset_&_growth",
  },
  {
    label: "Real Stories",
    value: "real_stories",
  },
];

const getCategory = (category: string) => {
    const result = categoryOptions.find((item)=> item.value === category);   
    return result?.label;
}

export default getCategory;
