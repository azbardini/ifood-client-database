const pg = require('pg');
const _ = require('underscore');
const rl = require('readline');
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cs = 'postgres://postgres:pass@localhost:5432/fbd';
const client = new pg.Client(cs);

initialize(client);

function initialize(client) {
  process.stdout.write('\033c');
  client.connect();
  showMenu();
}

async function showMenu() {
  while (true) {
    setTimeout(function () {
      console.log('\nSelect menu option: (help)');
    }, 100);
    var response = await userInput();
    process.stdout.write('\033c');
    switch (response) {
    case 'tudo':
      await tudo();
      break;
    case 'precos':
      await precos();
      break;
    case 'mcousine':
      await mcousine();
      break;
    case 'rest':
      await rest();
      break;
    case 'allrest':
      await allrest();
      break;
    case 'mostorder':
      await mostorder();
      break;
    case 'ratings':
      await ratings();
      break;
    case 'scousine':
      await scousine();
      break;
    case 'card':
      await card();
      break;
    case 'deliver':
      await deliver();
      break;
    case 'menu':
      await menu();
      break;
    case 'help':
      await help();
      break;
    case 'exit':
      await closeConnection();
      process.exit();
    }
  }
};

function help() {
  console.log('\ntudo:      Selects all data from input(table) (to watch trigger action)');
  console.log('precos:    (Group By / Subconsulta) - Preço de cada Item do último pedido do input(Customer.name)');
  console.log('mcousine:  (Group By) - Cousines mais pediadas por um input(Customer.name)');
  console.log('rest:      (View) - Restaurant que mais tem Meals da input(Cousine.name)');
  console.log('allrest:   (Subconsulta / View) - Restaurants que servem uma determinda input(Cousine.name) de uma input(cidade)');
  console.log('mostorder: (Group By / Having) - Nome dos Customers que fizeram mais que input(qtd) FinishedOrders');
  console.log('ratings:   (Group By) - Restaurants ordenados por Ratings');
  console.log('scousine:  (Not Exists / View) - Restaurants que tenham as mesmas Cousines que um input(Restaurante.name)');
  console.log('card:      (Group By) - Quantas vezes cada cliente pagou com cartão');
  console.log('deliver:   Todas as entregas que um input(Deliveryman.name) fez');
  console.log('menu:      Cardápio de um input(Restaurant.name), com cada Meal e seus Extras');
  console.log('\nhelp:      Help');
  console.log('exit:      Exit');
}

function closeConnection() {
  client.end();
  return 0;
}

async function tudo() {
  console.log('Select all from which table?');
  let response = await userInput();
  client.query(`select * from ${response};`).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function precos() {
  console.log('Nome completo do Customer: (Augusto Bardini)');
  let response = await userInput();
  client.query(`
    select Meal.name, Meal.price, Item.quantity,
    Meal.price*Item.quantity as Total, sum(Extra.price * Addition.quantity) as "Total Extras"
    from Item
    inner join Meal on Item.Meal=Meal.id
    left join Addition on Addition.meal=Meal.id
    left join Extra on Addition.extra=Extra.id
    where Item.request in ( select max(Request.id) from Request inner join Customer on Customer.cpf=Request.Customer where Customer.name = '${response}')
    group by Item.id, Meal.id
    order by Request;
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function mcousine() {
  console.log('Nome completo do Customer: (Andrei Rodrigues)');
  let response = await userInput();
  client.query(`
    select * from (select Category.Cousine, Cousine.cousinname, count(*)
    from Request
    inner join Customer on Request.customer = Customer.cpf
    inner join Item on Item.request = Request.id
    inner join meal on Item.meal = Meal.id
    inner join Category on Category.meal = Meal.id
    inner join Cousine on Category.cousine = Cousine.id
    where Request.customer = (select cpf from Customer where name = '${response}')
    group by Customer.name, Category.Cousine, Cousine.cousinname) as Cousines
    order by count desc;
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function rest() {
  console.log('Qual cousine? (Bebidas)');
  let response = await userInput();
  client.query(`
    select name, contagem from
    CousinesCount
    where cousinname = '${response}' and contagem = (select max(contagem) from CousinesCount);
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function allrest() {
  console.log('Qual a Cousine? (Pizza)');
  let response1 = await userInput();
  console.log('Qual a Cidade? (Porto Alegre)');
  let response2 = await userInput();
  client.query(`
    select Restaurant.popname, a.city, a.street, a.number, a.comp
    from Restaurant
    inner join Address as a on Restaurant.address = a.id
    where a.city = '${response2}' and
    Restaurant.cnpj in (
    	select cnpj from CousinesCount
    	where cousinname = '${response1}');
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function mostorder() {
  console.log('Quantas Orders? (1)');
  let response = await userInput();
  client.query(`
    select Customer.name, Customer.cpf
    from Customer
    inner join Request on Request.customer = Customer.cpf
    inner join Finished_Order on Finished_order.request = Request.id
    where Finished_Order.payed = 't'
    group by Customer.cpf, Customer.name
    having count(*)>${response};
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function ratings() {
  client.query(`
    select Restaurant.popname, avg(Finished_order.rating) as rating
    from Restaurant
    inner join Meal on Meal.restaurant = Restaurant.cnpj
    inner join Item on Item.meal = Meal.id
    inner join Finished_order on Finished_order.request = Item.request
    where Finished_order.rating is not null
    group by Restaurant.cnpj
    order by rating DESC;
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function scousine() {
  console.log('Qual restaurante? (Euclides da Cunha inc)');
  let response = await userInput();
  client.query(`
    select distinct popname, cnpj
    from CousinesCount as C
    where cnpj != (select cnpj from Restaurant where name = '${response}')
    	and not exists (
    		select * from CousinesCount
    		where cnpj = (select cnpj from Restaurant where name = '${response}')
    		and cousinname not in (
    			select cousinname
    			from CousinesCount
    			where cnpj=C.cnpj));
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function card() {
  client.query(`
    select Customer.name, count(*) as "Compras com cartão"
    from Customer
    inner join card on card.customer = customer.cpf
    inner join Purchase on Purchase.customer = card.customer and Purchase.cardnumber = card.cardnumber
    inner join finished_order on Purchase.finished_order = finished_order.id
    group by Customer.cpf;
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function deliver() {
  console.log('Nome do entregador: (Epaminondas Emanuel)');
  let response = await userInput();
  client.query(`
    select infoDelivery.*
    from DeliveryMan
    inner join Delivery on Delivery.deliveryman=deliveryman.id
    inner join infoDelivery on Delivery.finished_order=infoDelivery.request
    where DeliveryMan.name = '${response}';
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

async function menu() {
  console.log('ID do restaurante: (45454545454545)');
  let response = await userInput();
  client.query(`
    select Meal.name as Meal, Meal.Description, Meal.price, Meal.preptime, Extra.name as "Extra", Extra.price as "Extra price"
    from Meal
    left join Addition on Addition.meal=Meal.id
    left join Extra on Addition.extra=Extra.id
    where Meal.restaurant='${response}';
    `).then(res => {
    if (res && res.rows) {
      printOnScreen(res.rows);
    };
  }).catch(() => console.log("Error finding results"));
}

function userInput() {
  return new Promise(resolve => {
    readline.question('', answer => {
      return resolve(answer);
    });
  });
}

function printOnScreen(rows) {
  _.each(rows, columns => {
    console.log('\n');
    _.each(Object.keys(columns), key => {
      if (columns[key] != null) {
        console.log(key + ':     ' + columns[key]);
      }
    })
  });
}
