package com.app.DTO;



public class FeedbackDTO {


    private Long feedbackId;
    private String userName;
    private String comment;

    public FeedbackDTO(Long feedbackId, String userName, String comment) {
        this.feedbackId = feedbackId;
        this.userName = userName;
        this.comment = comment;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public String getUserName() {
        return userName;
    }

    public String getComment() {
        return comment;
    }
}