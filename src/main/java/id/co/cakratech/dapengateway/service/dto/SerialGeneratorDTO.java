package id.co.cakratech.dapengateway.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link id.co.cakratech.dapengateway.domain.SerialGenerator} entity.
 */
public class SerialGeneratorDTO implements Serializable {
    
    private Long id;

    @Size(max = 1)
    private String processCode;

    private String processName;

    private Long counter;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcessCode() {
        return processCode;
    }

    public void setProcessCode(String processCode) {
        this.processCode = processCode;
    }

    public String getProcessName() {
        return processName;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public Long getCounter() {
        return counter;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SerialGeneratorDTO serialGeneratorDTO = (SerialGeneratorDTO) o;
        if (serialGeneratorDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serialGeneratorDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SerialGeneratorDTO{" +
            "id=" + getId() +
            ", processCode='" + getProcessCode() + "'" +
            ", processName='" + getProcessName() + "'" +
            ", counter=" + getCounter() +
            "}";
    }
}
