package id.co.cakratech.dapengateway.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.co.cakratech.dapengateway.domain.Visitor} entity.
 */
public class VisitorDTO implements Serializable {
    
    private Long id;

    @Size(max = 50)
    private String email;

    @Size(max = 14)
    private String mobilePhone;

    @Size(max = 100)
    private String encodedPassword;

    private Integer memberStatus;

    private LocalDate memberSince;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public void setEncodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
    }

    public Integer getMemberStatus() {
        return memberStatus;
    }

    public void setMemberStatus(Integer memberStatus) {
        this.memberStatus = memberStatus;
    }

    public LocalDate getMemberSince() {
        return memberSince;
    }

    public void setMemberSince(LocalDate memberSince) {
        this.memberSince = memberSince;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        VisitorDTO visitorDTO = (VisitorDTO) o;
        if (visitorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visitorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "VisitorDTO{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", mobilePhone='" + getMobilePhone() + "'" +
            ", encodedPassword='" + getEncodedPassword() + "'" +
            ", memberStatus=" + getMemberStatus() +
            ", memberSince='" + getMemberSince() + "'" +
            "}";
    }
}
