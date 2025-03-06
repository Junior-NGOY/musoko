import data from "@/lib/data";
import { connectToDatabase } from ".";
import Product from "./models/product.model";
import User from "./models/user.model";
import Setting from "./models/setting.model";
import WebPage from "./models/web-page.model";
import { cwd } from "process";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());

const main = async () => {
  try {
    const { products, users, settings, webPages } = data;
    await connectToDatabase(process.env.MONGODB_URI);

    await Product.deleteMany();
    const createdProducts = await Product.insertMany(products);

    await User.deleteMany();
    const createdUser = await User.insertMany(users);

    await Setting.deleteMany();
    const createdSetting = await Setting.insertMany(settings);

    await WebPage.deleteMany();
    const createdWebPage = await WebPage.insertMany(webPages);

    console.log({
      createdProducts,
      createdUser,
      createdSetting,
      createdWebPage,
      message: "Seeded database successfully"
    });
    process.exit(0);
  } catch (error) {
    console.error("console...", error);
    throw new Error("Failed to seed database");
  }
};

main();
