package com.haanoo.learnspringboot;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
@Slf4j
public class LearnspringbootApplication{


    public static void main(String[] args) {
        SpringApplication.run(LearnspringbootApplication.class, args);
    }


    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
    }

    @Bean
    public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
        return args -> {
            Map<String,Object> map = new HashMap<>();
            map.put("appId","TestNewTask");
            map.put("password","admin123!");
            map.put("businessType","test");
            List list = new ArrayList<Map>();
            Map<String,String> m = new HashMap<>();
            m.put("mobile","13265000590");
            m.put("userId","eeye");
            list.add(m);
           map.put("sms",list);

            HttpHeaders headers = new HttpHeaders();
            headers.add("hello","world");
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<String> s = restTemplate.exchange("https://gturnquist-quoters.cfapps.io/api/random", HttpMethod.GET, entity, String.class);

        /*    s = restTemplate.postForObject("https://10.79.7.232:8443/SmsWebService/rest/sendSms.json"
                    , map, String.class);*/

            log.info("\n===>"+s);
        };
    }

}
