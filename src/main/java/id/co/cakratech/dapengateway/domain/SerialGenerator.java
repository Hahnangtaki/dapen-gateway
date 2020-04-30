package id.co.cakratech.dapengateway.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A SerialGenerator.
 */
@Entity
@Table(name = "serial_generator")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SerialGenerator implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 1)
    @Column(name = "process_code", length = 1)
    private String processCode;

    @Column(name = "process_name")
    private String processName;

    @Column(name = "counter")
    private Long counter;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProcessCode() {
        return processCode;
    }

    public SerialGenerator processCode(String processCode) {
        this.processCode = processCode;
        return this;
    }

    public void setProcessCode(String processCode) {
        this.processCode = processCode;
    }

    public String getProcessName() {
        return processName;
    }

    public SerialGenerator processName(String processName) {
        this.processName = processName;
        return this;
    }

    public void setProcessName(String processName) {
        this.processName = processName;
    }

    public Long getCounter() {
        return counter;
    }

    public SerialGenerator counter(Long counter) {
        this.counter = counter;
        return this;
    }

    public void setCounter(Long counter) {
        this.counter = counter;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SerialGenerator)) {
            return false;
        }
        return id != null && id.equals(((SerialGenerator) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SerialGenerator{" +
            "id=" + getId() +
            ", processCode='" + getProcessCode() + "'" +
            ", processName='" + getProcessName() + "'" +
            ", counter=" + getCounter() +
            "}";
    }
}
