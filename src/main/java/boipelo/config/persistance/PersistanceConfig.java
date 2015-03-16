package boipelo.config.persistance;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;

@Configuration
@EnableNeo4jRepositories("boipelo.repositories")
public class PersistanceConfig extends Neo4jConfiguration {

	PersistanceConfig() {

		setBasePackage("boipelo.domain");

	}

	@Bean(destroyMethod = "shutdown")
	public GraphDatabaseService graphDatabaseService(Environment environment) {

		return new GraphDatabaseFactory().newEmbeddedDatabase("target/boipelo.db");
		 
		//return new SpringRestGraphDatabase(
			//	environment.getProperty("neo4j.host"));

	}

}