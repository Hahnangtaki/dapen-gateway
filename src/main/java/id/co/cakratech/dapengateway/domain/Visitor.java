package id.co.cakratech.dapengateway.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Visitor.
 */
@Entity
@Table(name = "visitor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visitor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 50)
    @Column(name = "email", length = 50, unique = true)
    private String email;

    @Size(max = 14)
    @Column(name = "mobile_phone", length = 14, unique = true)
    private String mobilePhone;

    @Size(max = 100)
    @Column(name = "encoded_password", length = 100)
    private String encodedPassword;

    @Column(name = "member_status")
    private Integer memberStatus;

    @Column(name = "member_since")
    private LocalDate memberSince;

    @OneToMany(mappedBy = "visitor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<OtpHistory> otpHistories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public Visitor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public Visitor mobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
        return this;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getEncodedPassword() {
        return encodedPassword;
    }

    public Visitor encodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
        return this;
    }

    public void setEncodedPassword(String encodedPassword) {
        this.encodedPassword = encodedPassword;
    }

    public Integer getMemberStatus() {
        return memberStatus;
    }

    public Visitor memberStatus(Integer memberStatus) {
        this.memberStatus = memberStatus;
        return this;
    }

    public void setMemberStatus(Integer memberStatus) {
        this.memberStatus = memberStatus;
    }

    public LocalDate getMemberSince() {
        return memberSince;
    }

    public Visitor memberSince(LocalDate memberSince) {
        this.memberSince = memberSince;
        return this;
    }

    public void setMemberSince(LocalDate memberSince) {
        this.memberSince = memberSince;
    }

    public Set<OtpHistory> getOtpHistories() {
        return otpHistories;
    }

    public Visitor otpHistories(Set<OtpHistory> otpHistories) {
        this.otpHistories = otpHistories;
        return this;
    }

    public Visitor addOtpHistory(OtpHistory otpHistory) {
        this.otpHistories.add(otpHistory);
        otpHistory.setVisitor(this);
        return this;
    }

    public Visitor removeOtpHistory(OtpHistory otpHistory) {
        this.otpHistories.remove(otpHistory);
        otpHistory.setVisitor(null);
        return this;
    }

    public void setOtpHistories(Set<OtpHistory> otpHistories) {
        this.otpHistories = otpHistories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Visitor)) {
            return false;
        }
        return id != null && id.equals(((Visitor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Visitor{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", mobilePhone='" + getMobilePhone() + "'" +
            ", encodedPassword='" + getEncodedPassword() + "'" +
            ", memberStatus=" + getMemberStatus() +
            ", memberSince='" + getMemberSince() + "'" +
            "}";
    }
}
