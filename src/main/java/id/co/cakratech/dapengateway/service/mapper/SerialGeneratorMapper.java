package id.co.cakratech.dapengateway.service.mapper;


import id.co.cakratech.dapengateway.domain.*;
import id.co.cakratech.dapengateway.service.dto.SerialGeneratorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link SerialGenerator} and its DTO {@link SerialGeneratorDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SerialGeneratorMapper extends EntityMapper<SerialGeneratorDTO, SerialGenerator> {



    default SerialGenerator fromId(Long id) {
        if (id == null) {
            return null;
        }
        SerialGenerator serialGenerator = new SerialGenerator();
        serialGenerator.setId(id);
        return serialGenerator;
    }
}
