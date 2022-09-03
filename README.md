# library
A Book Library Lookup

## Learnt over the process

### HTML

- [x] Always rely on UTF-8
- [x] Depend on `.ico` for Favicon Icons

### CSS

#### Relevant to Creating Shapes

- [x] Create Progress Circle with SVG
    - Using Stroke
        - Stroke Width
        - Stroke Array

- [x] Create Shapes with CSS, if available, only then try SVG

- [x] `clip-path` works, `clip` is not standard
    - Also `clip-path` isn't responsive for content within
    - Needs a definitive SVG, doesn't work evenly on different sized content

#### Alignment

- [x] Always use `display` to give space to inline items
    - Works best with `display:flex`

- [x] Use Pixels for fixed alignment

- [x] `::before` and `::after` needs an explicit width or height, if previous element doesn't have height or width (esp. on `input` elements)
    - Input Elements can have pseudo-elements if `appearance: none`
        - Works for:
            - Radio Button
            - Checkboxes
    - Doesn't works for `select`

- [x] Centering a `position: fixed` element needs a negative margin to the height and width of the element to center it appropriately.

- [x] Can ignore the previously definitive styles using the global values.
    - `inherit` to inherit from parents
    - `initial` to reset the styling

- [x] Icons are best added with a `span` element below the element that needs to show on hover.

##### Tables

- [] Adding `flex` on table `td` affects it to one column only.
    - Why???

- [] Issues with `overflow` property on table
    - Have to set `display:block` to have it working
    - But why???

#### CSS States

- [x] Difference between Focus and Active
    - Focus is when the user interacts with the browser
    - Active is when the user clicks / activates the element
        - The time for active is ususally quite short



# Attribution

- Icons from:
    - Octicons
    - Feather Icons
    - Google Fonts

- Favicon : [School material icons created by kerismaker - Flaticon](https://www.flaticon.com/free-icons/school-material)

- Fonts from:
    - Google Fonts

- Star Rating System from :
    - [codemyui (codepen.io)](https://codepen.io/ashleynolan/pen/MyqrPr?editors=0100)