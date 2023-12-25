using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CourseWork.Server;

public partial class DefaultDbContext : DbContext
{
    public DefaultDbContext()
    {
    }

    public DefaultDbContext(DbContextOptions<DefaultDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Input> Inputs { get; set; }

    public virtual DbSet<Multiple> Multiples { get; set; }

    public virtual DbSet<PassedInput> PassedInputs { get; set; }

    public virtual DbSet<PassedMultiple> PassedMultiples { get; set; }

    public virtual DbSet<PassedSingle> PassedSingles { get; set; }

    public virtual DbSet<PassedTicket> PassedTickets { get; set; }

    public virtual DbSet<Single> Singles { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Teacher> Teachers { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    public virtual DbSet<Variant> Variants { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=default_db;Username=postgres;Password=Pg_2023_Admin");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Input>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("inputs_pkey");

            entity.ToTable("inputs");

            entity.HasIndex(e => e.TicketId, "inputs_ticket_id_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Ticket).WithOne(p => p.Input)
                .HasForeignKey<Input>(d => d.TicketId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("inputs_ticket_id_fkey");
        });

        modelBuilder.Entity<Multiple>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("multiples_pkey");

            entity.ToTable("multiples");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Ticket).WithMany(p => p.Multiples)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("multiples_ticket_id_fkey");
        });

        modelBuilder.Entity<PassedInput>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("passed_inputs_pkey");

            entity.ToTable("passed_inputs");

            entity.HasIndex(e => e.PassedTicketId, "passed_inputs_passed_ticket_id_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Correct).HasColumnName("correct");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.PassedTicketId).HasColumnName("passed_ticket_id");

            entity.HasOne(d => d.PassedTicket).WithOne(p => p.PassedInput)
                .HasForeignKey<PassedInput>(d => d.PassedTicketId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("passed_inputs_passed_ticket_id_fkey");
        });

        modelBuilder.Entity<PassedMultiple>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("passed_multiples_pkey");

            entity.ToTable("passed_multiples");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.PassedTicketId).HasColumnName("passed_ticket_id");

            entity.HasOne(d => d.PassedTicket).WithMany(p => p.PassedMultiples)
                .HasForeignKey(d => d.PassedTicketId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("passed_multiples_passed_ticket_id_fkey");
        });

        modelBuilder.Entity<PassedSingle>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("passed_singles_pkey");

            entity.ToTable("passed_singles");

            entity.HasIndex(e => e.PassedTicketId, "passed_singles_passed_ticket_id_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.PassedTicketId).HasColumnName("passed_ticket_id");

            entity.HasOne(d => d.PassedTicket).WithOne(p => p.PassedSingle)
                .HasForeignKey<PassedSingle>(d => d.PassedTicketId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("passed_singles_passed_ticket_id_fkey");
        });

        modelBuilder.Entity<PassedTicket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("passed_tickets_pkey");

            entity.ToTable("passed_tickets");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.StudentId)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("student_id");
            entity.Property(e => e.TickedId).HasColumnName("ticked_id");

            entity.HasOne(d => d.Student).WithMany(p => p.PassedTickets)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("passed_tickets_student_id_fkey");

            entity.HasOne(d => d.Ticked).WithMany(p => p.PassedTickets)
                .HasForeignKey(d => d.TickedId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("passed_tickets_ticked_id_fkey");
        });

        modelBuilder.Entity<Single>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("singles_pkey");

            entity.ToTable("singles");

            entity.HasIndex(e => e.TicketId, "singles_ticket_id_key").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Ticket).WithOne(p => p.Single)
                .HasForeignKey<Single>(d => d.TicketId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("singles_ticket_id_fkey");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.PassbookNumber).HasName("students_pkey");

            entity.ToTable("students");

            entity.Property(e => e.PassbookNumber)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("passbook_number");
            entity.Property(e => e.Firstname)
                .HasMaxLength(31)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(31)
                .HasColumnName("lastname");
            entity.Property(e => e.Password)
                .HasMaxLength(31)
                .HasColumnName("password");
            entity.Property(e => e.Patronymic)
                .HasMaxLength(31)
                .HasColumnName("patronymic");
            entity.Property(e => e.StudentGroup)
                .HasMaxLength(31)
                .HasColumnName("student_group");
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("teachers_pkey");

            entity.ToTable("teachers");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Firstname)
                .HasMaxLength(31)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(31)
                .HasColumnName("lastname");
            entity.Property(e => e.Login)
                .HasMaxLength(31)
                .HasColumnName("login");
            entity.Property(e => e.Password)
                .HasMaxLength(31)
                .HasColumnName("password");
            entity.Property(e => e.Patronymic)
                .HasMaxLength(31)
                .HasColumnName("patronymic");
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("tests_pkey");

            entity.ToTable("tests");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Passed)
                .HasDefaultValue(false)
                .HasColumnName("passed");
            entity.Property(e => e.TeacherId).HasColumnName("teacher_id");

            entity.HasOne(d => d.Teacher).WithMany(p => p.Tests)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("tests_teacher_id_fkey");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("tickets_pkey");

            entity.ToTable("tickets");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Cost).HasColumnName("cost");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Question).HasColumnName("question");
            entity.Property(e => e.TestId).HasColumnName("test_id");
            entity.Property(e => e.Type).HasColumnName("type");

            entity.HasOne(d => d.Test).WithMany(p => p.Tickets)
                .HasForeignKey(d => d.TestId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("tickets_test_id_fkey");
        });

        modelBuilder.Entity<Variant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("variants_pkey");

            entity.ToTable("variants");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("gen_random_uuid()")
                .HasColumnName("id");
            entity.Property(e => e.Data).HasColumnName("data");
            entity.Property(e => e.TicketId).HasColumnName("ticket_id");

            entity.HasOne(d => d.Ticket).WithMany(p => p.Variants)
                .HasForeignKey(d => d.TicketId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("variants_ticket_id_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
