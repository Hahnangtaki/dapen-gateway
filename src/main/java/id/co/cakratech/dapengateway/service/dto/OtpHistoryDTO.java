package id.co.cakratech.dapengateway.service.dto;

import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.co.cakratech.dapengateway.domain.OtpHistory} entity.
 */
public class OtpHistoryDTO implements Serializable {
    
    private Long id;

    @Size(max = 10)
    private String reffNo;

    @Size(max = 100)
    private String encodedOtp;

    private ZonedDateTime createdTime;

    private ZonedDateTime executedTime;

    private ZonedDateTime expiredTime;

    private Integer retryMax;

    private Integer retryCount;


    private Long visitorId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReffNo() {
        return reffNo;
    }

    public void setReffNo(String reffNo) {
        this.reffNo = reffNo;
    }

    public String getEncodedOtp() {
        return encodedOtp;
    }

    public void setEncodedOtp(String encodedOtp) {
        this.encodedOtp = encodedOtp;
    }

    public ZonedDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(ZonedDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public ZonedDateTime getExecutedTime() {
        return executedTime;
    }

    public void setExecutedTime(ZonedDateTime executedTime) {
        this.executedTime = executedTime;
    }

    public ZonedDateTime getExpiredTime() {
        return expiredTime;
    }

    public void setExpiredTime(ZonedDateTime expiredTime) {
        this.expiredTime = expiredTime;
    }

    public Integer getRetryMax() {
        return retryMax;
    }

    public void setRetryMax(Integer retryMax) {
        this.retryMax = retryMax;
    }

    public Integer getRetryCount() {
        return retryCount;
    }

    public void setRetryCount(Integer retryCount) {
        this.retryCount = retryCount;
    }

    public Long getVisitorId() {
        return visitorId;
    }

    public void setVisitorId(Long visitorId) {
        this.visitorId = visitorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        OtpHistoryDTO otpHistoryDTO = (OtpHistoryDTO) o;
        if (otpHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), otpHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OtpHistoryDTO{" +
            "id=" + getId() +
            ", reffNo='" + getReffNo() + "'" +
            ", encodedOtp='" + getEncodedOtp() + "'" +
            ", createdTime='" + getCreatedTime() + "'" +
            ", executedTime='" + getExecutedTime() + "'" +
            ", expiredTime='" + getExpiredTime() + "'" +
            ", retryMax=" + getRetryMax() +
            ", retryCount=" + getRetryCount() +
            ", visitorId=" + getVisitorId() +
            "}";
    }
}
