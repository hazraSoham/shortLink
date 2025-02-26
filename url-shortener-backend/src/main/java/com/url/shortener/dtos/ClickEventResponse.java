package com.url.shortener.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ClickEventResponse {
    private LocalDate clickDate;
    private Long count;
}
