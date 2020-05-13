import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchIngredients",
})
export class SearchIngredientsPipe implements PipeTransform {
  transform(sources: any, filter: any): any {
    if (filter === "") {
      return sources;
    }

    return sources.filter((source) => {
      return source.strIngredient.toLowerCase().includes(filter.toLowerCase());
    });
  }
}
