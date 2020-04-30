package id.co.cakratech.dapengateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.ZonedDateTime;

/**
 * A OtpHistory.
 */
@Entity
@Table(name = "otp_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OtpHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 10)
    @Column(name = "reff_no", length = 10)
    private String reffNo;

    @Size(max = 100)
    @Column(name = "encoded_otp", length = 100)
    private String encodedOtp;

    @Column(name = "created_time")
    private ZonedDateTime createdTime;

    @Column(name = "executed_time")
    private ZonedDateTime executedTime;

    @Column(name = "expired_time")
    private ZonedDateTime expiredTime;

    @Column(name = "retry_max")
    private Integer retryMax;

    @Column(name = "retry_count")
    private Integer retryCount;

    @ManyToOne
    @JsonIgnoreProperties("otpHistories")
    private Visitor visitor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReffNo() {
        return reffNo;
    }

    public OtpHistory reffNo(String reffNo) {
        this.reffNo = reffNo;
        return this;
    }

    public void setReffNo(String reffNo) {
        this.reffNo = reffNo;
    }

    public String getEncodedOtp() {
        return encodedOtp;
    }

    public OtpHistory encodedOtp(String encodedOtp) {
        this.encodedOtp = encodedOtp;
        return this;
    }

    public void setEncodedOtp(String encodedOtp) {
        this.encodedOtp = encodedOtp;
    }

    public ZonedDateTime getCreatedTime() {
        return createdTime;
    }

    public OtpHistory createdTime(ZonedDateTime createdTime) {
        this.createdTime = createdTime;
        return this;
    }

    public void setCreatedTime(ZonedDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public ZonedDateTime getExecutedTime() {
        return executedTime;
    }

    public OtpHistory executedTime(ZonedDateTime executedTime) {
        this.executedTime = executedTime;
        return this;
    }

    public void setExecutedTime(ZonedDateTime executedTime) {
        this.executedTime = executedTime;
    }

    public ZonedDateTime getExpiredTime() {
        return expiredTime;
    }

    public OtpHistory expiredTime(ZonedDateTime expiredTime) {
        this.expiredTime = expiredTime;
        return this;
    }

    public void setExpiredTime(ZonedDateTime expiredTime) {
        this.expiredTime = expiredTime;
    }

    public Integer getRetryMax() {
        return retryMax;
    }

    public OtpHistory retryMax(Integer retryMax) {
        this.retryMax = retryMax;
        return this;
    }

    public void setRetryMax(Integer retryMax) {
        this.retryMax = retryMax;
    }

    public Integer getRetryCount() {
        return retryCount;
    }

    public OtpHistory retryCount(Integer retryCount) {
        this.retryCount = retryCount;
        return this;
    }

    public void setRetryCount(Integer retryCount) {
        this.retryCount = retryCount;
    }

    public Visitor getVisitor() {
        return visitor;
    }

    public OtpHistory visitor(Visitor visitor) {
        this.visitor = visitor;
        return this;
    }

    public void setVisitor(Visitor visitor) {
        this.visitor = visitor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OtpHistory)) {
            return false;
        }
        return id != null && id.equals(((OtpHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OtpHistory{" +
            "id=" + getId() +
            ", reffNo='" + getReffNo() + "'" +
            ", encodedOtp='" + getEncodedOtp() + "'" +
            ", createdTime='" + getCreatedTime() + "'" +
            ", executedTime='" + getExecutedTime() + "'" +
            ", expiredTime='" + getExpiredTime() + "'" +
            ", retryMax=" + getRetryMax() +
            ", retryCount=" + getRetryCount() +
            "}";
    }
}
