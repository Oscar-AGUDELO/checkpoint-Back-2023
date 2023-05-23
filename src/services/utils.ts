
import { Api } from "../entities/Api";
import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "sqlite",
  database: "./database.db",
  synchronize: true,
  logging: true,
  entities: [Api],
});

export default datasource;
