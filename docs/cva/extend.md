Extending Components
ads via Carbon
Check out the latest remote job listings from the leading job board for designers, developers, and creative pros.
ads via Carbon
All cva components provide an optional class or className prop, which can be used to pass additional classes to the component.

// components/button.ts
import { cva } from "class-variance-authority";

const button = cva(/_ … _/);

button({ class: "m-4" });
// => "…buttonClasses m-4"

button({ className: "m-4" });
// => "…buttonClasses m-4"
