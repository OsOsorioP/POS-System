-- 1. Tabla de Categorías
CREATE TABLE categorias (
    cat_id SERIAL PRIMARY KEY,
    cat_nombre VARCHAR(50) UNIQUE NOT NULL
);

-- 2. Tabla de Proveedores
CREATE TABLE proveedores (
    prov_id SERIAL PRIMARY KEY,
    prov_nombre VARCHAR(50) UNIQUE NOT NULL,
    prov_contacto VARCHAR(50),
    prov_telefono VARCHAR(15) UNIQUE,
    prov_correo VARCHAR(50) UNIQUE,
    prov_direccion VARCHAR(100)
);

-- 3. Tabla de Productos
CREATE TABLE productos (
    prod_id SERIAL PRIMARY KEY,
    prod_nombre VARCHAR(50) NOT NULL,
    prod_descripcion VARCHAR(200),
    prod_cat_id INT REFERENCES categorias(cat_id) ON DELETE SET NULL,
    prod_precio_venta DECIMAL(10, 2) NOT NULL CHECK (prod_precio_venta >= 0),
    prod_precio_costo DECIMAL(10, 2) NOT NULL CHECK (prod_precio_costo >= 0),
    prod_nivel_reorden INT CHECK (prod_nivel_reorden >= 0),
    prod_prov_id INT REFERENCES proveedores(prov_id) ON DELETE SET NULL,
    UNIQUE (prod_nombre, prod_cat_id)
);

-- 4. Tabla de Clientes
CREATE TABLE clientes (
    cli_id SERIAL PRIMARY KEY,
    cli_nombre VARCHAR(50) NOT NULL,
    cli_apellido VARCHAR(50) NOT NULL,
    cli_correo VARCHAR(50) UNIQUE,
    cli_telefono VARCHAR(15) UNIQUE,
    cli_puntos_lealtad INT DEFAULT 0 CHECK (cli_puntos_lealtad >= 0),
    cli_fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- 5. Tabla de Empleados
CREATE TABLE empleados (
    emp_id SERIAL PRIMARY KEY,
    emp_nombre VARCHAR(50) NOT NULL,
    emp_apellido VARCHAR(50) NOT NULL,
    emp_correo VARCHAR(50) UNIQUE NOT NULL,
    emp_rol VARCHAR(20) CHECK (emp_rol IN ('cajero', 'gerente')),
    emp_telefono VARCHAR(15),
    emp_fecha_creacion TIMESTAMP DEFAULT NOW()
);

-- 6. Tabla de Métodos de Pago
CREATE TABLE metodos_pago (
    mp_id SERIAL PRIMARY KEY,
    mp_metodo VARCHAR(20) UNIQUE NOT NULL CHECK (mp_metodo IN ('efectivo', 'credito', 'debito'))
);

-- 7. Tabla de Transacciones de Venta
CREATE TABLE transacciones_venta (
    trans_id SERIAL PRIMARY KEY,
    trans_fecha TIMESTAMP DEFAULT NOW(),
    trans_monto_total DECIMAL(10, 2) NOT NULL CHECK (trans_monto_total >= 0),
    trans_metodo_pago_id INT REFERENCES metodos_pago(mp_id) ON DELETE RESTRICT,
    trans_emp_id INT REFERENCES empleados(emp_id) ON DELETE SET NULL,
    trans_cli_id INT REFERENCES clientes(cli_id) ON DELETE SET NULL
);

-- 8. Tabla de Detalles de Venta
CREATE TABLE detalles_venta (
    det_id SERIAL PRIMARY KEY,
    det_trans_id INT REFERENCES transacciones_venta(trans_id) ON DELETE CASCADE,
    det_prod_id INT REFERENCES productos(prod_id) ON DELETE SET NULL,
    det_cantidad INT NOT NULL CHECK (det_cantidad > 0),
    det_precio_unidad DECIMAL(10, 2) NOT NULL CHECK (det_precio_unidad >= 0)
);

-- 9. Tabla de Inventario
CREATE TABLE inventario (
    inv_id SERIAL PRIMARY KEY,
    inv_prod_id INT UNIQUE REFERENCES productos(prod_id) ON DELETE CASCADE,
    inv_stock_actual INT NOT NULL CHECK (inv_stock_actual >= 0),
    inv_stock_minimo INT NOT NULL CHECK (inv_stock_minimo >= 0),
    inv_fecha_ultima_reposicion TIMESTAMP
);

-- 10. Tabla de Auditoría para rastrear cambios
CREATE TABLE auditoria (
    aud_id SERIAL PRIMARY KEY,
    aud_tabla VARCHAR(50) NOT NULL,
    aud_operacion VARCHAR(10) CHECK (aud_operacion IN ('INSERT', 'UPDATE', 'DELETE')),
    aud_fecha TIMESTAMP DEFAULT NOW(),
    aud_emp_id INT REFERENCES empleados(emp_id),
    aud_datos_antiguos JSON,
    aud_datos_nuevos JSON
);

-- Índices para optimización de consultas
CREATE INDEX idx_producto_categoria ON productos (prod_cat_id);
CREATE INDEX idx_fecha_transaccion_venta ON transacciones_venta (trans_fecha);
CREATE INDEX idx_producto_inventario ON inventario (inv_prod_id);

----------------TRIGGERS------------------


CREATE OR REPLACE FUNCTION fn_registrar_auditoria()
RETURNS TRIGGER AS $$
DECLARE
    empleado_id INT;
BEGIN
    -- Verificar si la tabla tiene el campo emp_id
    IF TG_TABLE_NAME = 'empleados' THEN
        empleado_id := NEW.emp_id;
    ELSE
        empleado_id := NULL;
    END IF;

    -- Insertar en la tabla de auditoría
    INSERT INTO auditoria (
        aud_tabla, 
        aud_operacion, 
        aud_fecha, 
        aud_emp_id, 
        aud_datos_nuevos
    )
    VALUES (
        TG_TABLE_NAME, 
        TG_OP, 
        NOW(), 
        empleado_id, 
        row_to_json(NEW)
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_clientes_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON clientes
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();

CREATE TRIGGER trg_empleados_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON empleados
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();

CREATE TRIGGER trg_productos_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON productos
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();

-- Trigger para la tabla categorias
CREATE TRIGGER trg_categorias_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON categorias
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();

-- Trigger para la tabla proveedores
CREATE TRIGGER trg_proveedores_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON proveedores
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();

-- Trigger para la tabla transacciones_venta
CREATE TRIGGER trg_transacciones_venta_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON transacciones_venta
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();

-- Trigger para la tabla detalles_venta
CREATE TRIGGER trg_detalles_venta_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON detalles_venta
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();

-- Trigger para la tabla inventario
CREATE TRIGGER trg_inventario_auditoria
AFTER INSERT OR UPDATE OR DELETE
ON inventario
FOR EACH ROW
EXECUTE FUNCTION fn_registrar_auditoria();


-- Trigger para Actualizar Inventario
CREATE OR REPLACE FUNCTION actualizar_inventario() RETURNS TRIGGER AS $$
BEGIN
    -- Consultar la cantidad vendida del producto en la transacción
    UPDATE inventario
    SET inv_stock_actual = inv_stock_actual - NEW.det_cantidad
    WHERE inv_prod_id = NEW.det_prod_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_actualizar_inventario
AFTER INSERT ON detalles_venta
FOR EACH ROW
EXECUTE FUNCTION actualizar_inventario();


-- Trigger para Validar Integridad de Datos en Productos
CREATE OR REPLACE FUNCTION validar_precio_producto() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.prod_precio_venta < NEW.prod_precio_costo THEN
        RAISE EXCEPTION 'El precio de venta no puede ser menor que el precio de costo';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_precio_producto
AFTER INSERT OR UPDATE ON productos
FOR EACH ROW
EXECUTE FUNCTION validar_precio_producto();
