create table Customer (
    cpf     char(11) not null,
    email   varchar(80) not null,
    name    varchar(100) not null,
    passwd  varchar(35),
    primary key(cpf)
);

create table Coupon (
  id serial,
  name varchar(10)  not null unique,
  discountValue numeric(5,2) not null,
  validity timestamp not null,
  primary key(id)
);

create table Address (
  id serial,
  street varchar(100) not null,
  number varchar(6) not null,
  city varchar(50) not null,
  uf char(2) not null,
  comp varchar(50),
  primary key(id)
);

create table Request (
  id serial,
  customer varchar(11) references Customer(cpf),
  primary key(id)
);

create table Finished_Order (
  id int not null,
  request int references Request(id),
  dispatch int references Address(id),
  onMoneyPayment bool not null,
  orderDateTime timestamp not null,
  deliveredDateTime timestamp,
  payed bool not null,
  rating smallint,
  primary key(id)
);

create table Acquirement (
  Coupon_id int references Coupon(id),
  Customer_cpf char(11) references Customer(cpf),
  quantity int not null
);

create table Card (
  Customer char(11) not null references Customer(cpf),
  id int,
  cardNumber varchar(19) not null,
  cardSecNumber char(3) not null,
  cardValidity date not null,
  cardName varchar(100) not null,
  primary key(Customer, id),
  unique (Customer, cardNumber)
);

create table Attendance (
  address int references Address(id),
  customer char(11) references Customer(cpf)
);

create table Restaurant (
  cnpj varchar(14) not null,
  name varchar(100) not null,
  popName varchar(100) not null,
  address int references Address(id),
  primary key(cnpj)
);

create table Meal (
  id serial,
  restaurant varchar(14) references Restaurant(cnpj),
  name varchar(80) not null,
  deion varchar(1000),
  price numeric(5,2) not null,
  prepTime smallint,
  primary key(id)
);

create table Item (
  id serial,
  request int references Request(id),
  meal int references Meal(id),
  quantity smallint not null,
  primary key(id)
);

create table Extra (
  id serial,
  name varchar(80) not null,
  price numeric(5,2) not null,
  primary key(id)
);

create table Addition (
  meal int references Meal(id),
  extra int references Extra(id),
  quantity smallint not null
);

create table Cousine (
  id serial,
  cousinName varchar(50) not null,
  primary key(id)
);

create table Category (
  meal int references Meal(id),
  cousine int references Cousine(id),
  unique (meal, cousine)
);

create table DeliveryMan (
  id int not null,
  name varchar(100),
  cpf     char(11) not null,
  primary key(id)
);

create table Delivery (
  id serial,
  finished_order int references Finished_Order(id),
  deliveryMan int references DeliveryMan(id),
  likedOrNot bool,
  primary key(id),
  unique(finished_order, deliveryMan)
);

create table Purchase (
  customer char(11),
  cardNumber varchar(19),
  finished_order int references Finished_Order(id),
  FOREIGN KEY (customer,cardNumber) REFERENCES Card(customer,cardNumber)
);

create table Discount (
  coupon int references Coupon(id),
  finished_order int references Finished_Order(id)
);
