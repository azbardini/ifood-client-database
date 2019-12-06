insert into Customer values ('12312312312','augustob@gmail.com','Augusto Bardini','asdfasdfasdfasdfasdf');
insert into Customer values ('23423423423','andreir@gmail.com','Andrei Rodrigues','sdfgsdfgsdfgsdfgsdfg');
insert into Customer values ('34534534534','fulandot@gmail.com','Fulando de Tal','dfghdfghdfghdfghdfgh');
insert into Customer values ('45645645656','ciclanot@gmail.com','Ciclano de Tal','fghjfghjfghjfghjfghj');

insert into Coupon values (1, 'QueroQuero', 10, '2019-10-27 23:55:55');
insert into Coupon values (2, 'mataFome', 5, '2019-11-05 11:55:55');
insert into Coupon values (3, 'QueroMais', 2, '2019-11-15 15:55:55');

insert into Address values (1, 'Minha rua', 123, 'Canoas', 'RS', 'Apartamento 806');
insert into Address values (2, 'Avenida Lucas loureiro', 4321, 'Florianópolis', 'SC', '');
insert into Address values (3, 'Rua José de Pelotas', 665, 'Porto Alegre', 'RS', '');
insert into Address values (4, 'Avenida Marcos de Pombal', 657, 'Porto Alegre', 'RS', '');

insert into Request values (1, '23423423423');
insert into Request values (2, '12312312312');
insert into Request values (3, '45645645656');
insert into Request values (4, '23423423423');

insert into Finished_Order values (1, 1, 4, TRUE, '2019-10-05 21:21', '2019-10-05 21:55', TRUE, 7);
insert into Finished_Order values (2, 2, 1, FALSE, '2019-10-08 11:58', '2019-10-08 12:31', TRUE, 4);
insert into Finished_Order values (3, 3, 2, FALSE, '2019-10-15 23:10', '2019-10-15 23:59', TRUE, 9);
insert into Finished_Order values (4, 4, 4, FALSE, '2019-10-19 22:41', '2019-10-19 23:05', TRUE, 9);

insert into Acquirement values (1, '23423423423', 2);
insert into Acquirement values (2, '12312312312', 1);
insert into Acquirement values (3, '45645645656', 5);

insert into Card values ('12312312312', 1, '2468246824682468', 219, '2022-05-15', 'Augusto Bardini');
insert into Card values ('34534534534', 2, '6666888877775555', 666, '2024-09-05', 'Fulando de Tal');
insert into Card values ('34534534534', 3, '1111222233334444', 312, '2030-01-01', 'Fulando de Tal');
insert into Card values ('23423423423', 4, '8888444499992222', 999, '2020-10-10', 'Andrei Rodrigues');

insert into Attendance values (1, '12312312312');
insert into Attendance values (1, '23423423423');
insert into Attendance values (2, '12312312312');

insert into Restaurant values('12121212121212', 'Euclides da Cunha inc', 'O Rei do Burguer', 4);
insert into Restaurant values('45454545454545', 'Fernandez e cia', 'Pizzamania', 3);
insert into Restaurant values('59595959595959', 'Mané Pastéis e cia', 'Mané Pastéis e cia', 4);

insert into Meal values (1, '12121212121212', 'Hamburguer de Coração', 'Um baita hamburguer', 19.90, 20);
insert into Meal values (2, '45454545454545', 'Pizza de Portuguesa', 'Tomate, Queijo e Presunto', 34.90, 30);
insert into Meal values (3, '45454545454545', 'Refrigerante Guaraná', 'Garrafa de 2 litros', 8.90, 30);
insert into Meal values (4, '59595959595959', 'Pastel de Carne', 'Um gostoso pastel de carne', 9.90, 12);
insert into Meal values (5, '59595959595959', 'Suco de Uva', 'Um gostoso suco', 7.90, 12);

insert into Item values (1, 1, 1, 2);
insert into Item values (2, 2, 2, 1);
insert into Item values (3, 2, 3, 1);
insert into Item values (4, 3, 4, 3);
insert into Item values (5, 3, 5, 1);

insert into Extra values(1,'Queijo Cheddar', 5.00);
insert into Extra values(2,'Borda Catupiry', 5.00);
insert into Extra values(3,'Ketchup', 0.99);

insert into Addition values(1, 1, 1);
insert into Addition values(2, 2, 1);
insert into Addition values(3, 3, 3);

insert into Cousine values(1, 'Pizza');
insert into Cousine values(2, 'Hamburguer');
insert into Cousine values(3, 'Bebidas');
insert into Cousine values(4, 'Pastel');

insert into Category values(1,2);
insert into Category values(2,1);
insert into Category values(3,3);
insert into Category values(4,4);
insert into Category values(5,3);

insert into DeliveryMan values(1, 'Roberto da Silva', '11111111111');
insert into DeliveryMan values(2, 'Epaminondas Emanuel', '22222222222');
insert into DeliveryMan values(3, 'Benjamin da Rocha','33333333333');

insert into Delivery values(1,1,2,TRUE);
insert into Delivery values(2,2,1,FALSE);
insert into Delivery values(3,3,2,TRUE);

insert into Purchase values ('12312312312','2468246824682468', 2);
insert into Purchase values ('23423423423','8888444499992222', 4);
insert into Purchase values ('34534534534','1111222233334444', 4);

insert into Discount values (2, 2);
insert into Discount values (3, 3);
insert into Discount values (2, 4);
