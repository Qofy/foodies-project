import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";
import { meals } from "./mealsData";

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const submitted = await getSubmittedMeals();
  return [...meals, ...submitted];
}

export async function getMeal(slug){
  const submitted = await getSubmittedMeals();
  const allMeals = [...meals, ...submitted];
  return allMeals.find(meal => meal.slug === slug);
}

const SUBMISSIONS_FILE = 'submitted-meals.json';

async function getSubmittedMeals() {
  try {
    const data = await fs.promises.readFile(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveSubmittedMeals(meals) {
  await fs.promises.writeFile(SUBMISSIONS_FILE, JSON.stringify(meals, null, 2));
}

export async function saveMeal(formDatas){
  const baseSlug = slugify(formDatas.title, { lower: true });
  let slug = baseSlug;
  let counter = 1;

  const allMeals = [...meals, ...await getSubmittedMeals()];
  while (allMeals.some(m => m.slug === slug)) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  formDatas.slug = slug;
  formDatas.instructions = xss(formDatas.instructions);

  const extension = formDatas.image.name.split('.').pop();
  const fileName = `${formDatas.slug}.${extension}`;
  const bufferImage = Buffer.from(await formDatas.image.arrayBuffer());
  try {
    await fs.promises.writeFile(`public/images/${fileName}`, bufferImage);
  } catch (error) {
    throw new Error('Saving image failed: ' + error.message);
  }

  formDatas.image = `/images/${fileName}`;

  const submissions = await getSubmittedMeals();
  submissions.push(formDatas);
  await saveSubmittedMeals(submissions);
}