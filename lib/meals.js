import sql from "better-sqlite3";

import fs from "node:fs";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db")

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000))

   return db.prepare("SELECT * FROM meals").all()
}

export function getMeal(slug){
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(formDatas){
  // generate base slug and ensure uniqueness in the DB
  const baseSlug = slugify(formDatas.title, { lower: true });
  let slug = baseSlug;
  let counter = 1;
  const existsStmt = db.prepare('SELECT 1 FROM meals WHERE slug = ?');
  while (existsStmt.get(slug)) {
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
  db.prepare(`
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES(
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @image,
    @slug
    )
    `).run(formDatas);

}