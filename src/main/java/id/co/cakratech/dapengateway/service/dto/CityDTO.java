package id.co.cakratech.dapengateway.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.co.cakratech.dapengateway.domain.City} entity.
 */
public class CityDTO implements Serializable {
    
    private Long id;

    private String cityCode;

    private String cityName;


    private Long provinceId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Long getProvinceId() {
        return provinceId;
    }

    public void setProvinceId(Long provinceId) {
        this.provinceId = provinceId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CityDTO cityDTO = (CityDTO) o;
        if (cityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CityDTO{" +
            "id=" + getId() +
            ", cityCode='" + getCityCode() + "'" +
            ", cityName='" + getCityName() + "'" +
            ", provinceId=" + getProvinceId() +
            "}";
    }
}
