// scope all jquery objects
// ...kitchen page
var $kitchen; // all forms

// ...ingredients page
var $inStock; // in stock forms
var $outOfStock; // out of stock forms
var $editIngr; // edit buttons
var $addIngr; // add ingredient form

// ...order page
var $order; // form
var $orderOpt; // ingredient checkboxes

// run registerSubmitHandlers to initialize
registerSubmitHandlers();

function registerSubmitHandlers () {
  // get new jquery objects and UNBIND ANY EXISTING HANDLERS
  $kitchen = $('form.kitchen').unbind();
  $inStock = $('form.inStock').unbind();
  $outOfStock = $('form.outOfStock').unbind();
  $editIngr = $('input.edit').unbind();
  $addIngr = $('form#newIngredient').unbind();
  $order = $('form#order').unbind(); // DEFAULT ACTION
  $orderOpt = $('input.orderOpt').unbind();

  // register new handler for each jquery object w/ non-default action
  $kitchen.submit(HANDLERS.makeSubmitHandler('fulfilled', CALLBACKS.success.orderFulfilled));
  $inStock.submit(HANDLERS.makeSubmitHandler('markOutOfStock', CALLBACKS.success.toggleIngredient));
  $outOfStock.submit(HANDLERS.makeSubmitHandler('markInStock', CALLBACKS.success.toggleIngredient));
  $addIngr.submit(HANDLERS.makeSubmitHandler('addIngredient', CALLBACKS.success.newIngredient, true));
  $editIngr.click(HANDLERS.click.edit);
  $orderOpt.click(HANDLERS.click.orderOpt);
}