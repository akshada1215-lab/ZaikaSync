package com.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Feedback;

public interface feedbackRepository extends JpaRepository<Feedback, Long> {

	

}
