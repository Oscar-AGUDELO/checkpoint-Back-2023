import datasource from "../services/utils";
import { Api, Api2_1, Api2_2 } from "../entities/Api";
import { MessageToClient } from "../services/interfaces";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
@Resolver()
export class ApisResolver {
  @Mutation(() => Api)
  async createCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode") continentCode: string
  ): Promise<Api> {
    try {
      const exitingCountry = await datasource.getRepository(Api).findOne({
        where: {
          name,
        },
      });
      if (exitingCountry !== null) {
        // const error = { message: Messages.userExists };
        return exitingCountry;
      } else {
        const newCountry = await datasource.getRepository(Api).save({
          code,
          name,
          emoji,
          continentCode,
        });
        return newCountry;
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Mutation(() => Api)
  async updateEmojiAndcontinentCodeOfCountryByName(
    @Arg("continentCode") continentCode: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string
  ): Promise<Api> {
    try {
      const exitingCountry = await datasource.getRepository(Api).findOne({
        where: {
          name,
        },
      });
      if (exitingCountry !== null) {
        const newCountry = await datasource
          .getRepository(Api)
          .save({ ...exitingCountry, emoji, continentCode });
        return newCountry;
      } else {
        console.log("not existing country !");
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => [Api2_1])
  async findAllCountries(): Promise<Api2_1[]> {
    return await datasource.getRepository(Api).find();
  }

  @Query(() => [Api2_1])
  async findAllCountriesOfContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Api2_1[]> {
    return await datasource.getRepository(Api).find({
      where: {
        continentCode,
      },
    });
  }

  @Query(() => Api2_2, { nullable: true })
  async findCountryByCode(@Arg("code") code: string): Promise<Api2_2> {
    return await datasource.getRepository(Api).findOne({
      where: {
        code: code.toLocaleUpperCase(),
      },
    });
  }
  // @Mutation(() => Api)
  // async updateWilder(
  //   @Arg("wilderId") wilderId: number,
  //   @Arg("name") name: string,
  //   @Arg("city") city: string,
  //   @Arg("photoURL") photoURL: string
  // ): Promise<Api | MessageToClient> {
  //   const repository = datasource.getRepository(Api);

  //   // option A 32.0ms

  //   await repository.query(
  //     "UPDATE wilder SET name=?, city=?, photoURL=? WHERE id=?",
  //     [name, city, photoURL, wilderId]
  //   );
  //   const updatedWilder = await repository.findOne({
  //     where: {
  //       id: wilderId,
  //     },
  //   });
  //   return updatedWilder;

  //   // option B 46.0ms

  //   // const wilder = await repository.findOne({
  //   //   where: { id: wilderId },
  //   // });
  //   // if (wilder !== null) {
  //   //   wilder.name = name;
  //   //   wilder.city = city;
  //   //   wilder.photoURL = photoURL;
  //   //   const updatedWilder = await repository.save(wilder, { reload: true });
  //   //   return updatedWilder;
  //   // }
  // }

  // @Mutation(() => Api)
  // async deleteWilder(@Arg("wilderId") wilderId: number): Promise<Api> {
  //   const repository = datasource.getRepository(Api);
  //   const wilderToDelete = await repository.findOne({
  //     where: {
  //       id: wilderId,
  //     },
  //   });
  //   if (wilderToDelete !== null) {
  //     await repository.delete({
  //       id: wilderId,
  //     });
  //     // const succes = { message: Messages.userDeletedSucces };
  //     return wilderToDelete;
  //   }
  //   // const error = { message: Messages.userNotFound };
  //   return wilderToDelete;
  // }
}
