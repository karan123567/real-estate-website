--
-- PostgreSQL database dump
--

\restrict QGEocdcAYLAboDj8AXSmT5GWWINGge05H4MxLj8GWOQSwBJrx4hbDh4sViocwE4

-- Dumped from database version 17.0
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    name character varying(200),
    role character varying(20) DEFAULT 'admin'::character varying,
    status character varying(20) DEFAULT 'active'::character varying,
    reset_token character varying(500),
    reset_expires timestamp without time zone,
    last_login timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT admins_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'inactive'::character varying, 'suspended'::character varying])::text[])))
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.amenities (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(100) NOT NULL,
    icon character varying(10),
    category character varying(50)
);


ALTER TABLE public.amenities OWNER TO postgres;

--
-- Name: inquiries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inquiries (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    property_id uuid,
    name character varying(200) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(30),
    message text,
    inquiry_type character varying(50) DEFAULT 'general'::character varying,
    status character varying(50) DEFAULT 'new'::character varying,
    responded_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT inquiries_inquiry_type_check CHECK (((inquiry_type)::text = ANY ((ARRAY['viewing'::character varying, 'info'::character varying, 'offer'::character varying, 'general'::character varying])::text[]))),
    CONSTRAINT inquiries_status_check CHECK (((status)::text = ANY ((ARRAY['new'::character varying, 'contacted'::character varying, 'scheduled'::character varying, 'closed'::character varying])::text[])))
);


ALTER TABLE public.inquiries OWNER TO postgres;

--
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.properties (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    owner_id uuid,
    title character varying(255) NOT NULL,
    description text,
    property_type character varying(50) NOT NULL,
    listing_type character varying(20) NOT NULL,
    price numeric(15,2) NOT NULL,
    address text,
    city character varying(100),
    state character varying(100),
    country character varying(100) DEFAULT 'INDIA'::character varying,
    zip_code character varying(20),
    latitude numeric(10,8),
    longitude numeric(11,8),
    bedrooms integer,
    bathrooms integer,
    area_sqft numeric(10,2),
    year_built integer,
    status character varying(50) DEFAULT 'available'::character varying,
    featured boolean DEFAULT false,
    view_count integer DEFAULT 0,
    published_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT properties_listing_type_check CHECK (((listing_type)::text = ANY ((ARRAY['sale'::character varying, 'rent'::character varying])::text[]))),
    CONSTRAINT properties_property_type_check CHECK (((property_type)::text = ANY ((ARRAY['apartment'::character varying, 'house'::character varying, 'villa'::character varying, 'land'::character varying, 'commercial'::character varying])::text[]))),
    CONSTRAINT properties_status_check CHECK (((status)::text = ANY ((ARRAY['available'::character varying, 'pending'::character varying, 'sold'::character varying, 'rented'::character varying])::text[])))
);


ALTER TABLE public.properties OWNER TO postgres;

--
-- Name: property_amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_amenities (
    property_id uuid NOT NULL,
    amenity_id uuid NOT NULL
);


ALTER TABLE public.property_amenities OWNER TO postgres;

--
-- Name: property_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_images (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    property_id uuid NOT NULL,
    image_url character varying(1000) NOT NULL,
    cloudinary_public_id character varying(500),
    display_order integer DEFAULT 0,
    is_primary boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.property_images OWNER TO postgres;

--
-- Name: property_views; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.property_views (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    session_id uuid,
    property_id uuid,
    viewed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    time_spent integer DEFAULT 0,
    gallery_viewed boolean DEFAULT false,
    map_viewed boolean DEFAULT false,
    calculator_used boolean DEFAULT false
);


ALTER TABLE public.property_views OWNER TO postgres;

--
-- Name: search_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.search_logs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    session_id uuid,
    search_query text,
    filters jsonb DEFAULT '{}'::jsonb,
    results_count integer DEFAULT 0,
    searched_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.search_logs OWNER TO postgres;

--
-- Name: user_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_events (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    session_id uuid,
    event_type character varying(100),
    page_url character varying(500),
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_events OWNER TO postgres;

--
-- Name: visitor_sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.visitor_sessions (
    session_id uuid NOT NULL,
    ip_address character varying(45),
    user_agent text,
    device_type character varying(50),
    browser character varying(100),
    os character varying(100),
    screen_width integer,
    screen_height integer,
    country character varying(100),
    city character varying(100),
    referrer_url text,
    utm_source character varying(100),
    utm_medium character varying(100),
    utm_campaign character varying(100),
    is_returning boolean DEFAULT false,
    total_pages_viewed integer DEFAULT 0,
    total_time_seconds integer DEFAULT 0,
    first_visit timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    last_activity timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.visitor_sessions OWNER TO postgres;

--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, email, password_hash, name, role, status, reset_token, reset_expires, last_login, created_at, updated_at) FROM stdin;
8aa14e7c-14ea-4680-9cfa-462c0852acf4	cschandrahr@gmail.com	$2b$12$kv86E72EX84GTmTGLEbzTuZoaL8xmYO3YJW/.kPBXU7qqPCs9Trou	Chandra	admin	active	\N	\N	2026-03-14 16:35:42.285249	2026-02-25 19:52:42.109912	2026-02-25 19:52:42.109912
\.


--
-- Data for Name: amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.amenities (id, name, icon, category) FROM stdin;
\.


--
-- Data for Name: inquiries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inquiries (id, property_id, name, email, phone, message, inquiry_type, status, responded_at, created_at) FROM stdin;
2cfc7b8e-4364-49e7-b60c-8f452ce3229a	\N	John Doe	john@example.com	+1 234 567 8900	Hi, I'm interested in this property. Can I schedule a viewing?	general	new	\N	2026-03-01 21:34:23.43566
985b9a4a-41bd-431b-8f73-9ec918876e4a	\N	Karan Singh	ks6508462@gmail.com	7460076794	Hi, I'm interested in "this property" &amp; would like more information.	general	new	\N	2026-03-12 00:03:03.88368
7ba6c9b8-f1e5-4f4d-8183-de2110bef2ea	\N	Rohit	kumar.rohitrk2505@gmail.com	7068631927	Hi, I'm interested in "this property" &amp; would like more information.	general	new	\N	2026-03-12 13:20:41.648246
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.properties (id, owner_id, title, description, property_type, listing_type, price, address, city, state, country, zip_code, latitude, longitude, bedrooms, bathrooms, area_sqft, year_built, status, featured, view_count, published_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: property_amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_amenities (property_id, amenity_id) FROM stdin;
\.


--
-- Data for Name: property_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_images (id, property_id, image_url, cloudinary_public_id, display_order, is_primary, created_at) FROM stdin;
\.


--
-- Data for Name: property_views; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.property_views (id, session_id, property_id, viewed_at, time_spent, gallery_viewed, map_viewed, calculator_used) FROM stdin;
\.


--
-- Data for Name: search_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.search_logs (id, session_id, search_query, filters, results_count, searched_at) FROM stdin;
\.


--
-- Data for Name: user_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_events (id, session_id, event_type, page_url, metadata, created_at) FROM stdin;
\.


--
-- Data for Name: visitor_sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.visitor_sessions (session_id, ip_address, user_agent, device_type, browser, os, screen_width, screen_height, country, city, referrer_url, utm_source, utm_medium, utm_campaign, is_returning, total_pages_viewed, total_time_seconds, first_visit, last_activity) FROM stdin;
\.


--
-- Name: admins admins_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: amenities amenities_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT amenities_name_key UNIQUE (name);


--
-- Name: amenities amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT amenities_pkey PRIMARY KEY (id);


--
-- Name: inquiries inquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_pkey PRIMARY KEY (id);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: property_amenities property_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_amenities
    ADD CONSTRAINT property_amenities_pkey PRIMARY KEY (property_id, amenity_id);


--
-- Name: property_images property_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_images
    ADD CONSTRAINT property_images_pkey PRIMARY KEY (id);


--
-- Name: property_views property_views_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_views
    ADD CONSTRAINT property_views_pkey PRIMARY KEY (id);


--
-- Name: search_logs search_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_logs
    ADD CONSTRAINT search_logs_pkey PRIMARY KEY (id);


--
-- Name: user_events user_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_events
    ADD CONSTRAINT user_events_pkey PRIMARY KEY (id);


--
-- Name: visitor_sessions visitor_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.visitor_sessions
    ADD CONSTRAINT visitor_sessions_pkey PRIMARY KEY (session_id);


--
-- Name: idx_inquiries_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inquiries_created ON public.inquiries USING btree (created_at DESC);


--
-- Name: idx_inquiries_property; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inquiries_property ON public.inquiries USING btree (property_id);


--
-- Name: idx_inquiries_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_inquiries_status ON public.inquiries USING btree (status);


--
-- Name: idx_properties_city; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_city ON public.properties USING btree (city);


--
-- Name: idx_properties_city_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_city_status ON public.properties USING btree (city, status);


--
-- Name: idx_properties_created; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_created ON public.properties USING btree (created_at DESC);


--
-- Name: idx_properties_featured; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_featured ON public.properties USING btree (featured DESC, created_at DESC);


--
-- Name: idx_properties_images_property; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_images_property ON public.property_images USING btree (property_id);


--
-- Name: idx_properties_price; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_price ON public.properties USING btree (price);


--
-- Name: idx_properties_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_status ON public.properties USING btree (status);


--
-- Name: idx_properties_type; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_properties_type ON public.properties USING btree (property_type);


--
-- Name: idx_property_views_property; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_property_views_property ON public.property_views USING btree (property_id);


--
-- Name: idx_property_views_session; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_property_views_session ON public.property_views USING btree (session_id);


--
-- Name: idx_search_logs_data; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_search_logs_data ON public.search_logs USING btree (searched_at);


--
-- Name: idx_user_events_session; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_events_session ON public.user_events USING btree (session_id);


--
-- Name: idx_visitor_sessions_date; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_visitor_sessions_date ON public.visitor_sessions USING btree (first_visit);


--
-- Name: inquiries inquiries_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inquiries
    ADD CONSTRAINT inquiries_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- Name: properties properties_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.admins(id) ON DELETE SET NULL;


--
-- Name: property_amenities property_amenities_amenity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_amenities
    ADD CONSTRAINT property_amenities_amenity_id_fkey FOREIGN KEY (amenity_id) REFERENCES public.amenities(id) ON DELETE CASCADE;


--
-- Name: property_amenities property_amenities_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_amenities
    ADD CONSTRAINT property_amenities_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: property_images property_images_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_images
    ADD CONSTRAINT property_images_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: property_views property_views_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_views
    ADD CONSTRAINT property_views_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: property_views property_views_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.property_views
    ADD CONSTRAINT property_views_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.visitor_sessions(session_id) ON DELETE CASCADE;


--
-- Name: search_logs search_logs_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.search_logs
    ADD CONSTRAINT search_logs_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.visitor_sessions(session_id) ON DELETE CASCADE;


--
-- Name: user_events user_events_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_events
    ADD CONSTRAINT user_events_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.visitor_sessions(session_id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO dbuser;


--
-- Name: TABLE admins; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.admins TO dbuser;


--
-- Name: TABLE amenities; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.amenities TO dbuser;


--
-- Name: TABLE inquiries; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.inquiries TO dbuser;


--
-- Name: TABLE properties; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.properties TO dbuser;


--
-- Name: TABLE property_amenities; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.property_amenities TO dbuser;


--
-- Name: TABLE property_images; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.property_images TO dbuser;


--
-- Name: TABLE property_views; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.property_views TO dbuser;


--
-- Name: TABLE search_logs; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.search_logs TO dbuser;


--
-- Name: TABLE user_events; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_events TO dbuser;


--
-- Name: TABLE visitor_sessions; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.visitor_sessions TO dbuser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO dbuser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO dbuser;


--
-- PostgreSQL database dump complete
--

\unrestrict QGEocdcAYLAboDj8AXSmT5GWWINGge05H4MxLj8GWOQSwBJrx4hbDh4sViocwE4

