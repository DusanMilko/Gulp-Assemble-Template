## Markup

Declare array 

---
arr:
- {"a":"b"}

this.arr.[0] // {"a","b"}

---


Call Partial

{{>nav }}

Pass current page variable into partial

{{>nav this}}

Pass global data variable into partial 

{{>nav site}}

Pass inline variable

{{>nav key="value"}}