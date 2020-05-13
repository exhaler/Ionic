import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "slugify",
})
export class SlugifyPipe implements PipeTransform {
  transform(input: string): string {
    return input
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "_") // Replace spaces with _
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
}
