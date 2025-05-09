package com.nook.backend.model;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    @Indexed(unique = true)
    private String email;
    private String password;
    private String gender;
    private Integer workDuration = 1500;
    private Integer breakDuration = 300;
    private Map<String, Integer> studyMinutes = new HashMap<>();

    public Map<String, Integer> getStudyMinutes() {
        return studyMinutes;
    }

    public void setStudyMinutes(Map<String, Integer> studyMinutes) {
        this.studyMinutes = studyMinutes;
    }
}