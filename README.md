# Sortablesweets 🍭
Sortablesweets is a lightweight JavaScript project designed to simplify the management of sortable lists with events. It provides an intuitive drag-and-drop interface for effortlessly rearranging items within lists.

## Installation
Implement it via cdn at the bottom of your body.
```html
<script src="https://raw.githubusercontent.com/DuckyStudios/sortablesweets/master/sortablesweets.js"></script>
```

## Usage
With our freshly implemented attribute `sortable` you can make your list sortable, the only thing you have to worry about, is giving every `li` element an **id**, so you can work with the data after.

Example:
```html
  <ul sortable class="space-y-2 max-w-lg p-4" id="list">
      <li id="sugar" class="p-2 px-4 bg-red-500/10 hover:bg-red-500/20 rounded-lg duration-150">Sugar</li>
      <li id="butter" class="p-2 px-4 bg-red-500/10 hover:bg-red-500/20 rounded-lg duration-150">Butter</li>
      <li id="apples" class="p-2 px-4 bg-red-500/10 hover:bg-red-500/20 rounded-lg duration-150">Apples</li>
      <li id="sweets" class="p-2 px-4 bg-red-500/10 hover:bg-red-500/20 rounded-lg duration-150">Sweets</li>
  </ul>
```

And now you want to listen to your freshly implemented sortable list!

Example:
```javascript
const list = document.getElementById('list');

list.addEventListener('sortupdate', function(event) {
    console.log(event.sortage)
    /** The sortage is an array of the id's in the right and new order.
    * {
    *  "0": "butter",
    *  "1": "sugar",
    *  "2": "apples",
    *  "3": "sweets"
    */ }
});
```


## Requirements
- TailwindCSS (https://tailwindcss.com/)
