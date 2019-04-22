package cz.vutbr.pis.proj

import org.apache.catalina.webresources.FileResource
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.Resource
import org.springframework.web.servlet.config.annotation.*
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.FileSystemResource
import org.springframework.web.servlet.resource.PathResourceResolver


@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurerAdapter() {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedOrigins("*")
                .allowedHeaders("*")
    }


    private val CLASSPATH_RESOURCE_LOCATIONS =
            arrayOf("classpath:/static/")


    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        super.addResourceHandlers(registry)
        registry.addResourceHandler("/**")
                .addResourceLocations("file:../client/build/")
                .addResourceLocations(*CLASSPATH_RESOURCE_LOCATIONS)
                .resourceChain(false)
                .addResolver(object : PathResourceResolver() {
                    override fun getResource(resourcePath: String,
                                             location: Resource): Resource {
                        val requestedResource = location.createRelative(resourcePath)
                        return if ((requestedResource.exists() && requestedResource.isReadable)
                                || resourcePath.startsWith("/api")
                                || resourcePath.startsWith("api")) {
                            requestedResource
                        } else {
                            FileSystemResource("../client/build/index.html")
                        }
                    }
                });
    }


    override fun addViewControllers(registry: ViewControllerRegistry) {
        super.addViewControllers(registry)
        registry.addRedirectViewController("/", "/index.html")
    }
}
