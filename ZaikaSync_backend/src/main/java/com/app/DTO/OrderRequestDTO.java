package com.app.DTO;

import java.util.List;

public class OrderRequestDTO {
	 private Long userId;
	    private List<OrderItemDTO> items;
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public List<OrderItemDTO> getItems() {
			return items;
		}
		public void setItems(List<OrderItemDTO> items) {
			this.items = items;
		}
	    

}
