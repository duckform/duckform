export const helpCode = `
/** Example */

const scope = {
  enum: [{ label: 'a', value: 'a'}],
  suggest: (kw) => fetch('/suggest?kw='+kw) 
}

`;
