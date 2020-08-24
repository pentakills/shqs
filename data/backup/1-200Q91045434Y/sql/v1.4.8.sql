ALTER TABLE `ey_archives` ADD COLUMN `users_free`  tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否会员免费，默认0不免费，1为免费' AFTER `users_price`;
ALTER TABLE `ey_media_file` ADD COLUMN `gratis`  tinyint(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT '是否试看，0不试看，1试看' AFTER `playcount`;
ALTER TABLE `ey_users_level` ADD COLUMN `down_count`  int(10) NULL DEFAULT 0 COMMENT '每天下载次数限制' AFTER `amount`;

DROP TABLE IF EXISTS `ey_media_order`;
CREATE TABLE `ey_media_order` (
  `order_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '媒体订单ID',
  `order_code` varchar(20) NOT NULL DEFAULT '' COMMENT '媒体订单编号',
  `users_id` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '会员ID',
  `mobile` varchar(20) DEFAULT '' COMMENT '手机',
  `order_status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '订单状态：0未付款，1已付款',
  `order_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '订单应付总金额',
  `pay_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '支付时间',
  `pay_name` varchar(20) NOT NULL DEFAULT '' COMMENT '支付方式名称',
  `wechat_pay_type` varchar(20) NOT NULL DEFAULT '' COMMENT '微信支付时，标记使用的支付类型（扫码支付，微信内部，微信H5页面）',
  `pay_details` text COMMENT '支付时返回的数据，以serialize序列化后存入，用于后续查询。',
  `product_id` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '视频文档ID',
  `product_name` varchar(100) DEFAULT '' COMMENT '视频文档名称',
  `product_litpic` varchar(500) DEFAULT '' COMMENT '视频文档封面图片',
  `lang` varchar(30) DEFAULT 'cn' COMMENT '语言标识',
  `add_time` int(11) unsigned DEFAULT '0' COMMENT '下单时间',
  `update_time` int(11) unsigned DEFAULT '0' COMMENT '更新时间',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_code` (`order_code`) USING BTREE,
  KEY `users_id` (`users_id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='视频订单表';

UPDATE `ey_users_level` SET `down_count` = '100';
DELETE FROM `ey_users_menu` WHERE `mca` = 'user/Download/index';
INSERT INTO `ey_users_menu` (`title`, `mca`, `is_userpage`, `sort_order`, `status`, `lang`, `add_time`, `update_time`) VALUES ('我的下载', 'user/Download/index', '0', '100', '0', 'cn', '1590484667', '1590484667');