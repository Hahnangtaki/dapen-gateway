package id.co.cakratech.dapengateway.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.co.cakratech.dapengateway.domain.Country} entity.
 */
public class CountryDTO implements Serializable {
    
    private Long id;

    private String countryCodeDigits;

    private String countryName;

    private String nationality;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountryCodeDigits() {
        return countryCodeDigits;
    }

    public void setCountryCodeDigits(String countryCodeDigits) {
        this.countryCodeDigits = countryCodeDigits;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CountryDTO countryDTO = (CountryDTO) o;
        if (countryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), countryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CountryDTO{" +
            "id=" + getId() +
            ", countryCodeDigits='" + getCountryCodeDigits() + "'" +
            ", countryName='" + getCountryName() + "'" +
            ", nationality='" + getNationality() + "'" +
            "}";
    }
}
