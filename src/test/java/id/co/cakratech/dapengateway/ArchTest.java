package id.co.cakratech.dapengateway;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("id.co.cakratech.dapengateway");

        noClasses()
            .that()
            .resideInAnyPackage("id.co.cakratech.dapengateway.service..")
            .or()
            .resideInAnyPackage("id.co.cakratech.dapengateway.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..id.co.cakratech.dapengateway.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
