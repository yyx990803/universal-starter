import { Component, Input } from '@angular/core';

@Component({
  selector: 'cell',
  template: `<td>
    {{ item.id }}
    <span *ngFor="let row of grid; let i = index">
      <span *ngFor="let col of row; let j = index">
        {{ i }} {{ j }}
      </span>
    </span>
  </td>`
})
class Cell {
  @Input()
  item;
  grid = genRange(5);
}

@Component({
  selector: 'row',
  template: `<tr><cell *ngFor="let col of row.items" [item]="col"></cell></tr>`,
  directives: [Cell]
})
class Row {
  @Input()
  row;
}

@Component({
  moduleId: __filename,
  selector: 'home',
  styleUrls: [
    'home.style.css'
  ],
  templateUrl: 'home.template.html',
  directives: [Row]
})
export class Home {
  grid = generateGrid(100, 10);
}

function generateGrid (rowCount, columnCount) {
  const grid = []
  for (let r = 0; r < rowCount; r++) {
    var row = { id: r, items: [] }
    for (let c = 0; c < columnCount; c++) {
      row.items.push({ id: (r + '-' + c) })
    }
    grid.push(row)
  }
  return grid
}

function genRange (n) {
  const res = []
  for (let i = 0; i < n; i++) {
    const row = []
    for (let j = 0; j < n; j++) {
      row.push(j)
    }
    res.push(row)
  }
  return res
}
