package id.co.cakratech.dapengateway.service.mapper;


import id.co.cakratech.dapengateway.domain.*;
import id.co.cakratech.dapengateway.service.dto.VisitorDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Visitor} and its DTO {@link VisitorDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface VisitorMapper extends EntityMapper<VisitorDTO, Visitor> {


    @Mapping(target = "otpHistories", ignore = true)
    @Mapping(target = "removeOtpHistory", ignore = true)
    Visitor toEntity(VisitorDTO visitorDTO);

    default Visitor fromId(Long id) {
        if (id == null) {
            return null;
        }
        Visitor visitor = new Visitor();
        visitor.setId(id);
        return visitor;
    }
}
