# Banco de Dados
___

### Rodar Imagem

```
docker run -d -p 3306:3306 --name mysql -e "MYSQL_ROOT_PASSWORD=root" -e "MYSQL_DATABASE=db_criminix" -e "MYSQL_USER=user" -e MYSQL_PASSWORD="password" --network criminix mysql
```

### Rodar Script de Criação de Schema

```
CREATE TABLE `tb_research_form` (
  `id` int NOT NULL AUTO_INCREMENT,
  `scores` varchar(100) DEFAULT NULL,
  `cities` varchar(100) DEFAULT NULL,
  `neighborhoods` varchar(100) DEFAULT NULL,
  `satisfaction_rate` int DEFAULT NULL,
  `obversation` varchar(200) DEFAULT NULL,
  `suggestion_scores` varchar(200) DEFAULT NULL,
  `criminix_id` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `is_work_insurance` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
```