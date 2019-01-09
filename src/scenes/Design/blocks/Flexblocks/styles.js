export default classes => `
.${classes.rowContainer} {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.${classes.columnContainer} {
  display: flex;
  flex-direction: row;
  padding: 10px;
}

.${classes.item} {
  min-height: 75px;
  flex-basis: auto;
  flex-grow: 1;
}
`
