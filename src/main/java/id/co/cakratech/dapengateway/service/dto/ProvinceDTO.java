package id.co.cakratech.dapengateway.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.co.cakratech.dapengateway.domain.Province} entity.
 */
public class ProvinceDTO implements Serializable {
    
    private Long id;

    private String provinceCode;

    private String provinceName;


    private Long countryId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProvinceDTO provinceDTO = (ProvinceDTO) o;
        if (provinceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), provinceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProvinceDTO{" +
            "id=" + getId() +
            ", provinceCode='" + getProvinceCode() + "'" +
            ", provinceName='" + getProvinceName() + "'" +
            ", countryId=" + getCountryId() +
            "}";
    }
}
